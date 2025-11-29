import React from "react";
import Card from "../components/Card";
import { useData } from "../context/DataContext";

export default function Dashboard() {
  const { data } = useData();

  const totalCourses = data.courses.length;
  const totalForms = data.forms.length;
  const totalResponses = data.responses.length;

  function globalAverage() {
    let sum = 0, count = 0;
    data.responses.forEach(r => {
      Object.values(r.answers || {}).forEach(v => {
        if (typeof v === "number") { sum += v; count++; }
      });
    });
    return count ? (sum / count).toFixed(2) : "-";
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        <Card style={{ flex: 1 }} title="Courses"><div style={{ fontSize: 28, fontWeight: 700 }}>{totalCourses}</div><div className="small">Active courses</div></Card>
        <Card style={{ flex: 1 }} title="Forms"><div style={{ fontSize: 28, fontWeight: 700 }}>{totalForms}</div><div className="small">Feedback forms</div></Card>
        <Card style={{ flex: 1 }} title="Responses"><div style={{ fontSize: 28, fontWeight: 700 }}>{totalResponses}</div><div className="small">Submitted feedback</div></Card>
        <Card style={{ flex: 1 }} title="Avg Rating"><div style={{ fontSize: 28, fontWeight: 700 }}>{globalAverage()}</div><div className="small">Avg score</div></Card>
      </div>

      <Card title="Recent Activity">
        <div style={{ maxHeight: 220, overflowY: "auto" }}>
          {data.responses.slice().reverse().slice(0, 8).map(r => {
            const form = data.forms.find(f => f.id === r.formId);
            return (
              <div key={r.id} style={{ padding: "8px 0", borderBottom: "1px solid #f0f4ff" }}>
                <div style={{ fontWeight: 600 }}>{r.studentName || "Anonymous"}</div>
                <div className="small">{form ? form.title : "Form removed"}</div>
              </div>
            );
          })}
          {data.responses.length === 0 && <div className="small">No recent activity</div>}
        </div>
      </Card>
    </div>
  );
}
