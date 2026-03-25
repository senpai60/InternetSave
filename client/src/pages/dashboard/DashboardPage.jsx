import PageLaout from "../../components/layout/PageLaout";
import {
  Bookmark,
  Folder,
  History,
  LayoutGrid,
  Plus,
  Search,
  Zap,
} from "lucide-react";

const DashboardPage = () => {
  return (
    <PageLaout>
      <div className="pt-24 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Dashboard
            </h1>
            <p className="text-zinc-400 mt-2">Welcome back to your second brain.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-zinc-600 transition-all w-64"
              />
            </div>
            <button className="bg-zinc-50 text-zinc-950 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-zinc-200 transition-all cursor-pointer">
              <Plus className="w-4 h-4" /> Save Link
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          {/* Main Feed - Large Bento Card */}
          <div className="md:col-span-2 md:row-span-2 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-zinc-400" />
                <h3 className="font-semibold">Recent Saves</h3>
              </div>
              <button className="text-xs text-zinc-500 hover:text-zinc-300">View All</button>
            </div>
            <div className="space-y-4">
              {[
                "Exploring the future of Web3 UI",
                "How to build a SaaS in 2026",
                "Designing minimalist hero sections",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 transition-all cursor-pointer border border-transparent hover:border-zinc-700"
                >
                  <div className="w-10 h-10 bg-zinc-700 flex items-center justify-center rounded-xl">
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Glossy background effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-zinc-50/10 transition-all" />
          </div>

          {/* Quick Stats - Medium Bento Card */}
          <div className="md:col-span-1 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 group hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold">AI Insights</h3>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-zinc-400 leading-relaxed">
                You've saved <span className="text-zinc-100 font-bold">12 new articles</span> about
                design this week.
              </p>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-yellow-500 w-2/3 h-full" />
              </div>
            </div>
          </div>

          {/* Collections - Small Bento Card */}
          <div className="md:col-span-1 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 group hover:border-zinc-700 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <Folder className="w-5 h-5 text-zinc-400" />
              <h3 className="font-semibold text-sm">Top Folders</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-zinc-800 p-3 rounded-2xl text-center cursor-pointer hover:bg-zinc-700 transition-all border border-transparent hover:border-zinc-600">
                <span className="text-sm">Design</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded-2xl text-center cursor-pointer hover:bg-zinc-700 transition-all border border-transparent hover:border-zinc-600">
                <span className="text-sm">Dev</span>
              </div>
            </div>
          </div>

          {/* Productivity - Medium Bento Card */}
          <div className="md:col-span-2 bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-3xl p-6 flex items-center justify-between group">
            <div className="max-w-[70%]">
              <h3 className="text-lg font-bold mb-2">Sync Everywhere</h3>
              <p className="text-xs text-zinc-400 opacity-80 leading-relaxed">
                Install Linkora on all your devices to never miss a save.
              </p>
            </div>
            <div className="w-16 h-16 bg-zinc-50 text-zinc-950 flex items-center justify-center rounded-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <LayoutGrid className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
    </PageLaout>
  );
};

export default DashboardPage;
