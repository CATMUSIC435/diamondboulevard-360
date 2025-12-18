import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { useSidebar } from "../../contexts/sidebar-context";

export function SidebarUI() {
  const { isOpen, data, closeSidebar } = useSidebar();

  return (
    <Sheet open={isOpen} onOpenChange={(val) => !val && closeSidebar()} className='text-black'>
      <SheetContent side="right" className="bg-white backdrop-blur-2xl border-white/10 text-white w-[400px]">
        {data && (
          <div className="space-y-6">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold text-indigo-400">{data.title}</SheetTitle>
              <div className="h-1 w-10 bg-indigo-500" />
              <SheetDescription className="text-slate-400 text-base leading-relaxed pt-4">
                <img src={data.img} className="w-full" alt="" srcset="" />
              </SheetDescription>
            </SheetHeader>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
