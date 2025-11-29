const KEY = "fedf_data_v2";

const seed = {
  courses: [
    { id: "c1", name: "Intro to Programming" },
    { id: "c2", name: "Data Structures" },
  ],
  forms: [
    {
      id: "f1",
      title: "Intro to Programming - Course Feedback",
      courseId: "c1",
      questions: [
        { id: "q1", type: "rating", text: "Clarity of lectures (1-5)" },
        { id: "q2", type: "rating", text: "Usefulness of assignments (1-5)" },
        { id: "q3", type: "text", text: "Additional comments" }
      ]
    }
  ],
  responses: []
};

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("storage load error", err);
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
}

export function save(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (err) {
    console.error("storage save error", err);
  }
}
