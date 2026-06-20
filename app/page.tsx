import AddTaskForm from "@/app/components/AddTaskForm";
import TaskList from "@/app/components/TaskList";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    filter?: string;
  }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth");

  const params = await searchParams;
  const search = params.search || "";
  const filter = params.filter || "all";

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.sub,
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
      ...(filter === "completed" && {
        completed: true,
      }),
      ...(filter === "pending" && {
        completed: false,
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <main className="max-w-3xl mx-auto p-6 md:p-12 w-full">
      
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-100">
          TaskFlow <span className="text-blue-500">Pro</span>
        </h1>
        <div className="flex items-center gap-4 bg-zinc-900 px-5 py-2.5 rounded-full border border-zinc-800 shadow-sm">
          <span className="text-sm font-medium text-zinc-400">Hi, {user.name}</span>
          <div className="w-px h-4 bg-zinc-700"></div>
          <form action="/api/auth?action=logout" method="POST">
            <button type="submit" className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors">
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-zinc-100">{tasks.length}</span>
          <span className="text-sm text-zinc-500 font-medium mt-1">Total Tasks</span>
        </div>
        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-green-500">{completedCount}</span>
          <span className="text-sm text-zinc-500 font-medium mt-1">Completed</span>
        </div>
        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-amber-500">{pendingCount}</span>
          <span className="text-sm text-zinc-500 font-medium mt-1">Pending</span>
        </div>
      </div>

      {/* Controls: Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <form className="flex-1">
          <div className="relative">
            <input
              name="search"
              defaultValue={search}
              placeholder="Search tasks..."
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-zinc-600"
            />
            {/* Search Icon */}
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        <div className="flex gap-1 p-1 bg-zinc-900 rounded-xl border border-zinc-800 overflow-x-auto">
          <a 
            href="/" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center ${filter === 'all' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'}`}
          >
            All
          </a>
          <a 
            href="/?filter=pending" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center ${filter === 'pending' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'}`}
          >
            Pending
          </a>
          <a 
            href="/?filter=completed" 
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex items-center ${filter === 'completed' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'}`}
          >
            Completed
          </a>
        </div>
      </div>

      {/* Core Components wrapped in cards */}
      <div className="space-y-6">
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
          <AddTaskForm />
        </div>
        
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-6">
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
    </main>
  );
}