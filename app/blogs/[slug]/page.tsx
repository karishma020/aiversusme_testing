"use client";

import { use } from "react";
import BlogDetail from "@/app/components/blog-detail";

// By making this page entirely a client component, we eliminate the boundaries and allow you to 
// import data natively straight from your app/components/blog.tsx without issues or creating new files.
// Note: We remove generateStaticParams because the payload is dynamic client-side now.

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  return <BlogDetail slug={resolvedParams.slug} />;
}
