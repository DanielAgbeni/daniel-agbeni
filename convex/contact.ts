import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string()
  },
  handler: async (ctx, args) => {
    return ctx.db.insert('contacts', { ...args, createdAt: Date.now() });
  }
});
