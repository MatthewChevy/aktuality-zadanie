<template>
  <div class="card">
    <div class="card__container">
      <header class="card__header">
        <h1 class="card__title">Najčítanejšie</h1>
      </header>
      <span class="card__box">
        <a id="1" class="card__link card__link--active" href="#"> 24h </a>
        <i class="card__italic">/</i>

        <a id="3" class="card__link" href="#"> 3d </a>
        <i class="card__italic">/</i>

        <a id="7" class="card__link" href="#"> 7d </a>
      </span>
    </div>
    <article class="card__articles">
      <TheTitles :limitDays="limitDays" />
    </article>
  </div>
</template>

<script>
import TheTitles from "./components/TheTitles.vue";

export default {
  name: "App",

  components: {
    TheTitles,
  },

  data() {
    return {
      links: document.getElementsByClassName("card__link"),
      limitDays: 1,
    };
  },

  mounted() {
    this.links = [...this.links]; // Create object from htmlcollection

    this.links.forEach((link) => { 
      link.addEventListener("click", (e) => {
        this.limitDays = e.target.id; // Get target id and save it to variable

        this.links.forEach((element) => { // If element contain class card__link--active, remove it in loop
          element.classList.contains("card__link--active")
            ? element.classList.remove("card__link--active")
            : false;
        });

        !e.target.classList.contains("card__link--active") //If element do not contain card__link--active, add it
          ? e.target.classList.add("card__link--active")
          : false;
      });
    });
  },
};
</script>

<style lang="scss">
.card {
  position: relative;
  width: 24rem;
  padding: 1rem 1rem 0 1rem;
  top: 7rem;
  border: 1px black solid;
  border-radius: 10px;
  margin: 0 auto;

  &__container {
    display: flex;
    justify-content: space-between;
    width: 99%;
    margin: 0 auto;
  }

  &__title {
    color: rgb(209, 4, 4);
    font: {
      size: 16px;
      family: $primary-font;
      weight: 500;
    }
    padding-bottom: 1.3rem;
    text-transform: uppercase;
  }

  &__box {
    position: relative;
  }

  &__link {
    font: {
      family: $primary-font;
      size: 1rem;
      weight: 500;
    }
    padding: 0 0.2rem;
    color: rgb(92, 92, 92);
  }

  .card__link--active {
    color: rgb(207, 47, 49);
  }

  &__italic {
    padding: 0 0.15rem;
    font: {
      family: $primary-font;
      size: 1rem;
      weight: 500;
    }
    color: rgb(92, 92, 92);
  }

  &__articles {
    flex-wrap: wrap;
    flex-basis: 100%;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
