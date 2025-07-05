import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const Micropen = pgTable("micropen", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  authorId: text("author_id").notNull(), // Clerk user ID
});
