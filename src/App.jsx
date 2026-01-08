import Map from './components/Map';
import Overlay from './components/Overlay';

function App() {
  return (
    <div className="min-h-screen bg-neutralLight text-neutralDark font-sans">
      <header className="bg-primary text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">BrickMulyo</h1>
            <p className="text-xs opacity-90 font-medium">Peta Sebaran UMKM Batu Bata</p>
          </div>
          <button className="bg-secondary text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-opacity-90 transition-colors shadow-sm">
            Login / Admin
          </button>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
           {/* Map Wrapper with fixed height */}
           <div className="h-[75vh] w-full relative">
             <Map />
             <Overlay />
           </div>
        </div>
      </main>
      
      <footer className="bg-neutralDark text-slate-400 py-6 mt-8">
        <div className="container mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} BrickMulyo Project. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
