import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  stackMatrix: defineTable({
    category: v.string(),
    name: v.string(),
    level: v.optional(v.string()),
    order: v.number(),
    updatedAt: v.number()
  }).index('by_category', ['category']),
  registry: defineTable({
    title: v.string(),
    summary: v.string(),
    tags: v.array(v.string()),
    liveUrl: v.optional(v.string()),
    sourceUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id('_storage')),
    imageUrl: v.optional(v.string()),
    featured: v.boolean(),
    order: v.number(),
    updatedAt: v.number()
  }).index('by_featured', ['featured']),
  systemLogs: defineTable({
    year: v.number(),
    title: v.string(),
    details: v.string(),
    order: v.number(),
    updatedAt: v.number()
  }).index('by_year', ['year'])
});
