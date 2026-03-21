import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    techStack: v.array(v.string()),
    imageId: v.id('_storage'),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    featured: v.boolean(),
    createdAt: v.number()
  })
    .index('by_featured', ['featured'])
    .index('by_created_at', ['createdAt']),
  services: defineTable({
    title: v.string(),
    description: v.string(),
    icon: v.string()
  }),
  experience: defineTable({
    year: v.string(),
    title: v.string(),
    description: v.string(),
    order: v.number()
  }).index('by_order', ['order']),
  skills: defineTable({
    category: v.union(v.literal('frontend'), v.literal('backend'), v.literal('mobile'), v.literal('cloud')),
    name: v.string()
  }).index('by_category', ['category']),
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    createdAt: v.number()
  })
});
