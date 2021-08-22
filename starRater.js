// classe start rater que herda de HTMLElement

class StarRater extends HTMLElement {
  constructor() {
    super();

    this.build();
  }

  // junção dos elementos criados
  build() {
    // shadow DOM editável
    const shadow = this.attachShadow({ mode: "open" });
    const rater = this.createRater();

    shadow.appendChild(this.styles());

    this.stars = this.createStars();
    this.stars.forEach((star) => rater.appendChild(star));
    this.resetRating();

    shadow.appendChild(rater);
  }

  createRater() {
    const rater = document.createElement("div");

    rater.classList.add("star-rater");
    rater.addEventListener("mouseout", this.resetRating.bind(this));

    return rater;
  }

  createStars() {
    const createStar = (_, id) => {
      const star = document.createElement("span");

      star.classList.add("star");
      star.setAttribute("data-value", Number(id) + 1);
      star.innerHTML = "&#9733;";

      // mouseover: evento que dispara ao passar o mouse por cima
      // bind devolve o valor que se perdeu no contexto
      star.addEventListener("click", this.setRating.bind(this));
      star.addEventListener("mouseover", this.ratingHover.bind(this));

      return star;
    };

    return Array.from({ length: 5 }, createStar);
  }

  resetRating() {
    this.currentRatingValue = this.getAttribute("data-rating") || 0;
    this.hightlightRating();
  }

  setRating(event) {
    this.setAttribute(
      "data-rating",
      event.currentTarget.getAttribute("data-value")
    );
  }

  ratingHover(event) {
    this.currentRatingValue = event.currentTarget.getAttribute("data-value");
    this.hightlightRating();
  }

  hightlightRating() {
    this.stars.forEach((star) => {
      const currentValue = this.currentRatingValue;
      const starValue = star.getAttribute("data-value");
      const colorType = currentValue >= starValue ? "#f80" : "grey";

      star.style.color = colorType;
    });
  }

  styles() {
    const style = document.createElement("style");

    style.textContent = `
			.star-rater {
				display: flex;
				align-items: center;
			}

			.star {
				font-size: 2rem;
				cursor: pointer;
				color: grey;
			}
			
			.star:nth-child(n + 2) {
				margin: 0 2px;
			}
		`;

    return style;
  }
}

// Criar o um novo elemento
// Obs: sempre deve ter um traço, mesmo que sem nada no final
customElements.define("star-rater", StarRater);
