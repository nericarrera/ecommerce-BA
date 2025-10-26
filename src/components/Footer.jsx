function Footer() {
  return (
    <footer
      className="text-center p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        borderTop: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {/* Efecto de partículas futuristas */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(120, 219, 226, 0.8) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(255, 119, 184, 0.6) 0%, transparent 50%)`,
        }}
      />
      
      {/* Efecto de brillo */}
      <div 
        className="absolute bottom-0 left-0 w-full h-1"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
          boxShadow: "0 0 20px 2px rgba(120, 219, 226, 0.5)"
        }}
      />
      
      <div className="relative z-10">
        <p className="text-lg font-light tracking-wider mb-2">
          &copy; 2025 - Adopciones Transfor
        </p>
        <p className="text-sm opacity-80 font-light">
          Todos los derechos reservados
        </p>
        
        {/* Elementos decorativos futuristas */}
        <div className="flex justify-center space-x-4 mt-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 opacity-70 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400 opacity-70 animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="w-2 h-2 rounded-full bg-pink-400 opacity-70 animate-pulse" style={{animationDelay: '0.6s'}}></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
