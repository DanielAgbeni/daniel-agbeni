import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('systemLogs').collect();
  }
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id('systemLogs')),
    year: v.number(),
    title: v.string(),
    details: v.string(),
    order: v.number()
  },
  handler: async (ctx, args) => {
    const payload = { ...args, updatedAt: Date.now() };
    delete payload.id;
    if (args.id) {
      await ctx.db.patch(args.id, payload);
      return args.id;
    }
    return await ctx.db.insert('systemLogs', payload);
  }
});

export const remove = mutation({
  args: { id: v.id('systemLogs') },
  handler: async (ctx, args) => ctx.db.delete(args.id)
});
