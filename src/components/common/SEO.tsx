import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

const DEFAULT_META = {
  title: 'BintyByte Technologies - Data & AI Solutions',
  description:
    'Transform your business with cutting-edge data engineering, AI solutions, and cloud infrastructure. Expert consulting for modern enterprises.',
  keywords:
    'data engineering, AI solutions, cloud infrastructure, machine learning, data analytics, AWS, GCP, Azure',
  image: '/og-image.jpg',
  type: 'website' as const,
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  type = 'website',
  noIndex = false,
}) => {
  const location = useLocation();

  const seoTitle = title ? `${title} | BintyByte Technologies` : DEFAULT_META.title;
  const seoDescription = description || DEFAULT_META.description;
  const seoKeywords = keywords || DEFAULT_META.keywords;
  const seoImage = image || DEFAULT_META.image;
  const canonicalUrl = `${window.location.origin}${window.location.pathname}${location.search}`;

  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', seoKeywords);

    if (noIndex) {
      updateMetaTag('robots', 'noindex,nofollow');
    } else {
      updateMetaTag('robots', 'index,follow');
    }

    // Open Graph tags
    updateMetaTag('og:title', seoTitle, true);
    updateMetaTag('og:description', seoDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', seoImage, true);
    updateMetaTag('og:site_name', 'BintyByte Technologies', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seoTitle);
    updateMetaTag('twitter:description', seoDescription);
    updateMetaTag('twitter:image', seoImage);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [seoTitle, seoDescription, seoKeywords, seoImage, type, canonicalUrl, noIndex]);

  return null;
};
