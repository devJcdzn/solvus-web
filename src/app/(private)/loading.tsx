import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="p-6 mt-5 bg-background min-h-[84vh] rounded-xl border">
            <div className="flex gap-2 w-full  flex-col sm:flex-row items-center justify-between mb-6">
                <Skeleton className="h-8 w-80 rounded-lg" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                <Skeleton className="w-full h-96 rounded-lg" />
                <Skeleton className="w-full h-90 rounded-lg" />
            </div>
        </div>
    )
}