// src/components/SEO.jsx
import { Helmet, HelmetProvider } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteTitle = "Adopta una Mascota - Encuentra tu compañero ideal";
  const siteDescription = "Adopta perros y gatos en busca de un hogar. Mascotas saludables, vacunadas y listas para ser parte de tu familia.";
  const defaultImage = "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1200&h=630&fit=crop";
  const siteUrl = "https://tusitio.com";

  return (
    <HelmetProvider>
      <Helmet>
        {/* Metadatos básicos */}
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <meta name="description" content={description || siteDescription} />
        <meta name="keywords" content={keywords || "adopción, mascotas, perros, gatos, adopta, animal, compañero"} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url || siteUrl} />
        <meta property="og:title" content={title || siteTitle} />
        <meta property="og:description" content={description || siteDescription} />
        <meta property="og:image" content={image || defaultImage} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url || siteUrl} />
        <meta property="twitter:title" content={title || siteTitle} />
        <meta property="twitter:description" content={description || siteDescription} />
        <meta property="twitter:image" content={image || defaultImage} />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        
        {/* Idioma */}
        <html lang="es" />
      </Helmet>
    </HelmetProvider>
  );
};

export default SEO;