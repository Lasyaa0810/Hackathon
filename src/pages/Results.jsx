import React from "react";
import Card from "../components/Card";
import { useData } from "../context/DataContext";


function computeStats(data) {
  const forms = data.forms || [];
  const responses = data.responses || [];

  return forms.map((form) => {
    const formResponses = responses.filter((r) => r.formId === form.id);

    const qstats = form.questions.map((q) => {
      if (q.type === "rating") {
        const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let sum = 0;
        let validCount = 0;

        formResponses.forEach((r) => {
          const raw = r.answers ? r.answers[q.id] : undefined;

          const val = raw === undefined || raw === null ? null : Number(raw);

          if (!Number.isNaN(val) && val >= 1 && val <= 5) {
            counts[val] = (counts[val] || 0) + 1;
            sum += val;
            validCount += 1;
          }
        });

        const avg = validCount ? (sum / validCount).toFixed(2) : "-";
        return { ...q, counts, avg, totalResponses: validCount };
      } else {
        const texts = formResponses.map((r) => r.answers?.[q.id]).filter(Boolean);
        return { ...q, texts };
      }
    });

    return { form, qstats, responses: formResponses };
  });
}

export default function Results() {
  const { data } = useData();
  const stats = computeStats(data);

  return (
    <div>
      <Card title="Results & Analytics">
        {stats.length === 0 && <div style={{ color: "var(--muted)" }}>No forms created yet.</div>}

        {stats.map((s) => (
          <div key={s.form.id} style={{ marginBottom: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{s.form.title}</div>
                <div className="small" style={{ marginTop: 4 }}>{s.responses.length} responses</div>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              {s.qstats.map((q) => (
                <div key={q.id} style={{ marginBottom: 18 }}>
                  <div style={{ fontWeight: 600 }}>{q.text}</div>

                  {q.type === "rating" ? (
                    <>
                      <div className="small" style={{ marginBottom: 8 }}>Average: {q.avg}</div>

                      {}
                      <div>
                        {Object.entries(q.counts).map(([k, v]) => {
                          const total = Object.values(q.counts).reduce((a, b) => a + b, 0);
                          const pct = total ? Math.round((Number(v) / total) * 100) : 0;

                          return (
                            <div key={k} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                              <div style={{ width: 24, fontWeight: 600 }}>{k}</div>

                              <div style={{ flex: 1, background: "#eef6ff", borderRadius: 8, overflow: "hidden" }}>
                                <div
                                  style={{
                                    width: `${pct}%`,
                                    height: 14,
                                    background: "linear-gradient(90deg,var(--primary-500),var(--accent-500))",
                                    transition: "width .35s ease",
                                  }}
                                />
                              </div>

                              <div style={{ width: 36, textAlign: "right", fontWeight: 700 }}>{v}</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div style={{ marginTop: 8 }}>
                      {q.texts.length === 0 ? <div className="small">No responses</div> :
                        q.texts.map((t, i) => (
                          <div key={i} style={{ padding: 10, background: "#fafafa", borderRadius: 8, marginBottom: 8 }}>{t}</div>
                        ))
                      }
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
