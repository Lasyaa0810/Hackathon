import React from "react";
import Card from "../components/Card";
import { useData } from "../context/DataContext";

// Chart.js imports
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

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
      <Card title="Results &amp; Analytics">
        {stats.length === 0 && (
          <div style={{ color: "var(--muted)" }}>No forms created yet.</div>
        )}

        {stats.map((s) => (
          <div key={s.form.id} style={{ marginBottom: 24 }}>
            {/* Form header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{s.form.title}</div>
                <div className="small" style={{ marginTop: 4 }}>
                  {s.responses.length} responses
                </div>
              </div>
            </div>

            {/* Questions */}
            <div style={{ marginTop: 16 }}>
              {s.qstats.map((q) => {
                if (q.type === "rating") {
                  const labels = Object.keys(q.counts);
                  const values = Object.values(q.counts);
                  const total = values.reduce((a, b) => a + b, 0) || 1; // avoid 0 division

                  const barData = {
                    labels,
                    datasets: [
                      {
                        label: "Number of responses",
                        data: values,
                        backgroundColor: "rgba(16, 185, 129, 0.8)", // Fresh green
                        borderWidth: 0,
                        borderRadius: 6,
                      },
                    ],
                  };

                  const barOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => ` ${ctx.parsed.y} responses`,
                        },
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0,
                        },
                      },
                    },
                  };

                  const pieData = {
                    labels: labels.map((l) => `Rating ${l}`),
                    datasets: [
                      {
                        data: values,
                        backgroundColor: [
                          "rgba(5, 150, 105, 0.85)", // Darker green
                          "rgba(16, 185, 129, 0.85)", // Main apple green
                          "rgba(110, 231, 183, 0.85)", // Light mint
                          "rgba(52, 211, 153, 0.85)", // Bright fresh green
                          "rgba(167, 243, 208, 0.85)", // Very soft green
                        ],
                      },
                    ],
                  };

                  const pieOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          boxWidth: 12,
                          usePointStyle: true,
                        },
                      },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => {
                            const value = ctx.parsed;
                            const pct = Math.round((value / total) * 100);
                            return ` ${value} responses (${pct}%)`;
                          },
                        },
                      },
                    },
                  };

                  return (
                    <div
                      key={q.id}
                      style={{
                        marginBottom: 22,
                        padding: 14,
                        borderRadius: 12,
                        background: "#fafafa",
                        border: "1px solid #eee",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 600,
                          marginBottom: 6,
                        }}
                      >
                        {q.text}
                      </div>
                      <div
                        className="small"
                        style={{ marginBottom: 10, color: "var(--muted)" }}
                      >
                        Average rating: <strong>{q.avg}</strong>{" "}
                        {q.totalResponses ? `from ${q.totalResponses} responses` : ""}
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
                          gap: 16,
                        }}
                      >
                        <div
                          style={{
                            minHeight: 220,
                          }}
                        >
                          <Bar data={barData} options={barOptions} />
                        </div>
                        <div
                          style={{
                            minHeight: 220,
                          }}
                        >
                          <Pie data={pieData} options={pieOptions} />
                        </div>
                      </div>
                    </div>
                  );
                }

                // Text question
                return (
                  <div
                    key={q.id}
                    style={{
                      marginBottom: 20,
                      padding: 14,
                      borderRadius: 12,
                      background: "#fafafa",
                      border: "1px solid #eee",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        marginBottom: 6,
                      }}
                    >
                      {q.text}
                    </div>
                    <div style={{ marginTop: 6 }}>
                      {q.texts.length === 0 ? (
                        <div className="small" style={{ color: "var(--muted)" }}>
                          No responses yet.
                        </div>
                      ) : (
                        q.texts.map((t, i) => (
                          <div
                            key={i}
                            style={{
                              padding: 10,
                              background: "white",
                              borderRadius: 8,
                              marginBottom: 8,
                              border: "1px solid #eee",
                            }}
                          >
                            {t}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
