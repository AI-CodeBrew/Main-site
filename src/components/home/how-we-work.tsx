import { howWeWork } from "@/lib/content/site";

export function HowWeWork() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#f8f9fc" }} aria-labelledby="process-heading">
      <div className="container-page">
        <div className="max-w-3xl mb-12 text-center mx-auto">
          <h2 id="process-heading" className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#070643" }}>
            How we work
          </h2>
          <p className="text-lg text-gray-600">Three steps. No mystery process.</p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {howWeWork.map((item) => (
            <li key={item.step} className="text-center md:text-left">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-bold mb-4"
                style={{ background: "linear-gradient(135deg, #0A0045, #5A83FF)" }}
              >
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#070643" }}>
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
