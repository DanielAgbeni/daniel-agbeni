import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query('services').collect()
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id('services')),
    title: v.string(),
    description: v.string(),
    icon: v.string()
  },
  handler: async (ctx, args) => {
    const payload = { title: args.title, description: args.description, icon: args.icon };
    if (args.id) {
      await ctx.db.patch(args.id, payload);
      return args.id;
    }
    return ctx.db.insert('services', payload);
  }
});

export const remove = mutation({
  args: { id: v.id('services') },
  handler: async (ctx, { id }) => ctx.db.delete(id)
});
