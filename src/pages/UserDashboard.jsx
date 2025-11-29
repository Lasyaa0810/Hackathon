import React from "react";
import Card from "../components/Card";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

export default function UserDashboard() {
  const { data } = useData();
  const { user } = useAuth();

  const myResponses = data.responses.filter((r) => {
    if (!user?.name) return false;
    return r.studentName === user.name;
  });

  return (
    <div>
      <div className="h1">Your Dashboard</div>

      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        <Card title="Forms Filled" style={{ flex: 1 }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{myResponses.length}</div>
          <div className="small">Total responses submitted by you</div>

          <div style={{ marginTop: 12 }}>
            {myResponses.length === 0 && <div className="small">You haven't submitted any feedback yet.</div>}
            {myResponses.slice().reverse().slice(0, 6).map((r) => {
              const form = data.forms.find((f) => f.id === r.formId);
              const course = data.courses.find((c) => c.id === r.courseId);
              return (
                <div key={r.id} style={{ marginTop: 10, padding: 10, background: "#fff", borderRadius: 8, boxShadow: "0 2px 6px rgba(12,17,24,0.04)" }}>
                  <div style={{ fontWeight: 700 }}>{form?.title || "Form removed"}</div>
                  <div className="small">{course?.name || "Course removed"} • {new Date(r.createdAt).toLocaleString()}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card title="Quick Actions" style={{ width: 320 }}>
          <div style={{ marginBottom: 8 }}>Use the Feedback page to submit more responses.</div>
          <div className="small">Only you can see your submitted responses here.</div>
        </Card>
      </div>
    </div>
  );
}
