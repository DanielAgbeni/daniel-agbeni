import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query('projects').withIndex('by_created_at').order('desc').collect();
    return Promise.all(
      items.map(async (item) => ({
        ...item,
        imageUrl: await ctx.storage.getUrl(item.imageId)
      }))
    );
  }
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => ctx.storage.generateUploadUrl()
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id('projects')),
    title: v.string(),
    description: v.string(),
    techStack: v.array(v.string()),
    imageId: v.id('_storage'),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    featured: v.boolean()
  },
  handler: async (ctx, args) => {
    const payload = {
      title: args.title,
      description: args.description,
      techStack: args.techStack,
      imageId: args.imageId,
      liveUrl: args.liveUrl,
      githubUrl: args.githubUrl,
      featured: args.featured,
      createdAt: Date.now()
    };

    if (args.id) {
      await ctx.db.patch(args.id, payload);
      return args.id;
    }

    return ctx.db.insert('projects', payload);
  }
});

export const remove = mutation({
  args: { id: v.id('projects') },
  handler: async (ctx, { id }) => ctx.db.delete(id)
});
