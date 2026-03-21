import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {},
  handler: async (ctx) => ctx.db.query('skills').collect()
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id('skills')),
    category: v.union(v.literal('frontend'), v.literal('backend'), v.literal('mobile'), v.literal('cloud')),
    name: v.string()
  },
  handler: async (ctx, args) => {
    const payload = { category: args.category, name: args.name };
    if (args.id) {
      await ctx.db.patch(args.id, payload);
      return args.id;
    }
    return ctx.db.insert('skills', payload);
  }
});

export const remove = mutation({
  args: { id: v.id('skills') },
  handler: async (ctx, { id }) => ctx.db.delete(id)
});
