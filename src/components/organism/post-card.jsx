export function PostCard({ post }) {
  const image =
    post.yoast_head_json?.["og_image"]?.[0]?.url ??
    "/placeholder.jpg";

  return (
    <div className="group relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-orange-500/50">
      
      {/* Hover shine effect */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-0 -skew-x-12 translate-x-[-100%] bg-gradient-to-r from-transparent via-orange-500/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Image */}
        <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl">
          <img
            src={image}
            alt={post.title.rendered}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Title */}
        <h3
          className="mb-3 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-orange-600"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Excerpt */}
        <div
          className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-400"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        {/* Footer */}
        <div className="mt-auto border-t border-white/5 pt-4">
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-orange-600 transition-colors hover:text-orange-300"
          >
            Đọc thêm
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
