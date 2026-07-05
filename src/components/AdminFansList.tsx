"use client";
import { format } from "date-fns";

export default function AdminFansList({ fans }: { fans: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gold/10 text-white/40 text-xs uppercase tracking-wider">
            <th className="text-left py-3 pr-4">Name</th>
            <th className="text-left py-3 pr-4">Email</th>
            <th className="text-left py-3 pr-4">Joined</th>
            <th className="text-left py-3">Last Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {fans.map((fan, i) => (
            <tr key={i} className="hover:bg-white/2 transition-colors">
              <td className="py-4 pr-4 font-medium">
                {fan.user_name || "Unknown"}
              </td>
              <td className="py-4 pr-4 text-white/60">{fan.user_email}</td>
              <td className="py-4 pr-4 text-white/40 text-xs">
                {format(new Date(fan.created_at), "PP")}
              </td>
              <td className="py-4">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${fan.status === "approved" ? "bg-green-500/20 text-green-400" : fan.status === "pending" ? "bg-gold/20 text-gold" : "bg-red-500/20 text-red-400"}`}
                >
                  {fan.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {fans.length === 0 && (
        <p className="text-white/30 text-center py-12">
          No registered fans yet.
        </p>
      )}
    </div>
  );
}
