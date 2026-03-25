import PageLaout from "../../components/layout/PageLaout";
import { Bookmark, LayoutGrid, Share2, Zap } from "lucide-react";
import "./homepage.css";

const HomePage = () => {
  const features = [
    {
      icon: <Bookmark className="w-6 h-6" />,
      title: "One-Click Save",
      desc: "Save any element, link, or snippet instantly with our powerful browser extension.",
    },
    {
      icon: <LayoutGrid className="w-6 h-6" />,
      title: "Smart Collections",
      desc: "Organize your saves into themed collections with auto-tagging and AI categorization.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Search",
      desc: "Find anything you've saved in milliseconds with our lightning-fast full-text search.",
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Team Sharing",
      desc: "Share collections with your team or keep them private. You're in control.",
    },
  ];

  return (
    <PageLaout>
      {/* Hero Section */}
      <section className="hero w-full min-h-screen flex items-center pt-20 relative">
        <div className="hero-content w-full md:w-3/5">
          <h1 className="leading-tight">
            Save anything <br />
            <span className="text-zinc-500">from the internet.</span>
          </h1>

          <h2 className="text-zinc-400 font-light mt-6 max-w-2xl text-xl md:text-2xl">
            Linkora is a modern browser extension that helps you capture,
            organize, and rediscover anything that sparks your curiosity.
          </h2>
          <div className="btns flex flex-wrap gap-4 mt-10">
            <button className="px-8 py-3 bg-zinc-50 text-zinc-900 rounded-full font-medium hover:bg-zinc-200 transition-all cursor-pointer">
              Add to Chrome — It's free
            </button>
            <button className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-zinc-50 rounded-full font-medium hover:bg-zinc-800 transition-all cursor-pointer">
              View Dashboard
            </button>
          </div>
        </div>
        <div className="hero-img">
          <img src="/logo-white.png" alt="" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-t border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works / Split Section */}
      <section className="py-24 border-t border-zinc-900 flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <div className="w-full aspect-video rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-zinc-500/10 to-transparent" />
            <div className="w-2/3 h-1/2 bg-zinc-800 rounded-lg shadow-2xl relative z-10 p-4">
              <div className="w-full h-2 bg-zinc-700 rounded-full mb-3" />
              <div className="w-4/5 h-2 bg-zinc-700 rounded-full mb-3 opacity-50" />
              <div className="w-full h-12 bg-zinc-600/20 rounded mt-6 border border-zinc-500/20" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 block">
            How it works
          </span>
          <h2 className="mb-8">Capture elements directly from pages</h2>
          <div className="space-y-8">
            {[
              {
                step: "01",
                text: "Activate save mode with a single shortcut.",
              },
              {
                step: "02",
                text: "Hover over anything—images, text, or entire sections.",
              },
              {
                step: "03",
                text: "One click saves it to your cloud instantly.",
              },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-2xl font-black text-zinc-800">
                  {s.step}
                </span>
                <p className="text-lg text-zinc-300 pt-1">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 border-t border-zinc-900 text-center">
        <div className="max-w-3xl mx-auto py-20 px-6 md:px-10 rounded-[3rem] bg-zinc-50 text-zinc-950">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-950!">
            Ready to organize your internet?
          </h2>
          <p className="text-xl mb-10 opacity-70">
            Join thousands of users who are building their personal knowledge
            base with Linkora.
          </p>
          <button className="px-10 py-4 bg-zinc-950 text-zinc-50 rounded-full font-bold text-lg hover:scale-105 transition-all cursor-pointer">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Basic Footer */}
      <footer className="py-10 border-t border-zinc-900 flex justify-between items-center text-zinc-500 text-sm">
        <p>© 2026 Linkora. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-zinc-300">
            Twitter
          </a>
          <a href="#" className="hover:text-zinc-300">
            GitHub
          </a>
          <a href="#" className="hover:text-zinc-300">
            Privacy
          </a>
        </div>
      </footer>
    </PageLaout>
  );
};

export default HomePage;
