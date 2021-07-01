export function About() {
  return (
    <>
      <div className="about-bg-photo">
        <img src="../../img/barn-photo.jpg" alt="barn photo" className="about-bg-photo__img" />
      </div>
      <main className="about">
        <h2 className="about__title">About us</h2>

        <section className="about__text first">
          <h3 className="about__text--title">Since 1929</h3>

          <p className="about__text--description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima nam voluptate itaque aspernatur earum fugiat, tenetur consequatur fugit maiores repudiandae magni labore dolorem similique eos velit possimus, ad, dolore libero.
          </p>
        </section>

        <section className="about__text second">
          <h3 className="about__text--title">All the way till now.</h3>

          <p className="about__text--description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima nam voluptate itaque aspernatur earum fugiat, tenetur consequatur fugit maiores repudiandae magni labore dolorem similique eos velit possimus, ad, dolore libero.
          </p>
        </section>

      </main>
    </>
  )
}
