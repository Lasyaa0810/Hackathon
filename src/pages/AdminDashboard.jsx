import React from "react";
import Card from "../components/Card";
import { useData } from "../context/DataContext";

export default function AdminDashboard() {
  const { data } = useData();

  return (
    <div>
      <div className="h1">Admin Dashboard</div>

      {}
      <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
        <Card title="Courses">
          <div style={{ fontSize: 28, fontWeight: 700 }}>{data.courses.length}</div>
        </Card>

        <Card title="Forms">
          <div style={{ fontSize: 28, fontWeight: 700 }}>{data.forms.length}</div>
        </Card>

        <Card title="Responses">
          <div style={{ fontSize: 28, fontWeight: 700 }}>{data.responses.length}</div>
        </Card>
      </div>

      {}
      <div style={{ marginTop: 18 }}>
        <Card title="Recent Submissions">
          {data.responses.length === 0 && (
            <div className="small">No submissions yet</div>
          )}

          {data.responses
            .slice()
            .reverse()
            .slice(0, 8)
            .map((r) => {
              const form = data.forms.find((f) => f.id === r.formId);
              const course = data.courses.find((c) => c.id === r.courseId);

              return (
                <div
                  key={r.id}
                  style={{
                    padding: 10,
                    borderBottom: "1px solid #fafafa",
                  }}
                >
                  {}
                  <div style={{ fontWeight: 700, color: "var(--primary-700)" }}>
                    {form ? form.title : "Form Deleted"}
                  </div>

                  <div className="small" style={{ marginTop: 4 }}>
                    {course ? course.name : "Course Deleted"} •{" "}
                    {new Date(r.createdAt).toLocaleString()}
                  </div>
                </div>
              );
            })}
        </Card>
      </div>
    </div>
  );
}
