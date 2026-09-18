import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';


export function JournalCard({ article }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-[520px] relative">
      <div className="relative h-56 shrink-0 overflow-hidden">
        <Link to={`/journal/${article.slug}`} className="block w-full h-full">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none lg:block hidden"></div>
        </Link>
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-charcoal tracking-wide uppercase shadow-sm">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        {(article.destination || article.country) && (
          <div className="flex items-center text-xs text-bronze font-semibold uppercase tracking-wider mb-2">
            <span>{article.destination ? `${article.destination}${article.country ? ', ' + article.country : ''}` : article.country}</span>
          </div>
        )}
        
        <Link to={`/journal/${article.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 font-serif line-clamp-2 leading-tight hover:text-bronze transition-colors">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
          {article.shortDescription}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-6">
          <div className="flex items-center gap-1.5"><Clock size={14} className="text-bronze" /> {article.readTime}</div>
          <div className="flex items-center gap-1.5"><Calendar size={14} className="text-bronze" /> {article.publishedDate}</div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">By</span>
            <span className="text-sm font-bold text-gray-900">{article.author}</span>
          </div>
          <Link 
            to={`/journal/${article.slug}`}
            className="flex items-center gap-2 text-bronze font-semibold text-sm hover:text-bronzeLight transition-colors"
          >
            Read More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
