import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('registry').collect();
  }
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  }
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id('registry')),
    title: v.string(),
    summary: v.string(),
    tags: v.array(v.string()),
    liveUrl: v.optional(v.string()),
    sourceUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
    imageUrl: v.optional(v.string()),
    featured: v.boolean(),
    order: v.number()
  },
  handler: async (ctx, args) => {
    const payload = { ...args, updatedAt: Date.now() };
    delete payload.id;
    if (args.id) {
      await ctx.db.patch(args.id, payload);
      return args.id;
    }
    return await ctx.db.insert('registry', payload);
  }
});

export const remove = mutation({
  args: { id: v.id('registry') },
  handler: async (ctx, args) => ctx.db.delete(args.id)
});
