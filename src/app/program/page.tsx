import Image from "next/image"

export default function ProgramPage() {
  return (
    <div>
        <section className="hero">
          <Image src="[IMAGE_HERO_PROGRAM]" alt="Program" width={800} height={600} />
          <h1>Program</h1>
          <p>Body copy</p>
          <button>Button</button>
        </section>
        <section className="content-cards">
          <div className="card">
            <Image src="[IMAGE_CARD]" alt="Card" width={400} height={300} />
            <h2>Card 1</h2>
            <p>Body copy</p>
            <a href="#">Link</a>
          </div>
          <div className="card">
            <Image src="[IMAGE_CARD]" alt="Card" width={400} height={300} />
            <h2>Card 2</h2>
            <p>Body copy</p>
            <a href="#">Link</a>
          </div>
          <div className="card">
            <Image src="[IMAGE_CARD]" alt="Card" width={400} height={300} />
            <h2>Card 3</h2>
            <p>Body copy</p>
            <a href="#">Link</a>
          </div>
        </section>
        <section className="form">
          <h2>Form</h2>
          <form>
            <label>Label</label>
            <input type="text" />
            <label>Label</label>
            <textarea></textarea>
            <button>Button</button>
          </form>
        </section>
    </div>
  );
}
