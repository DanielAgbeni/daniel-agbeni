import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query('experience').withIndex('by_order').order('asc').collect()
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id('experience')),
    year: v.string(),
    title: v.string(),
    description: v.string(),
    order: v.number()
  },
  handler: async (ctx, args) => {
    const payload = { year: args.year, title: args.title, description: args.description, order: args.order };
    if (args.id) {
      await ctx.db.patch(args.id, payload);
      return args.id;
    }
    return ctx.db.insert('experience', payload);
  }
});

export const remove = mutation({
  args: { id: v.id('experience') },
  handler: async (ctx, { id }) => ctx.db.delete(id)
});
