<template>
  <ol class="list">
    <li
      class="list__item"
      v-for="title in articles[`${limitDays}`]"
      :key="title.id"
    >
      <a class="list__link" :href="title.url">{{ title.title }}</a>
    </li>
  </ol>
</template>

<script>
import axios from "axios";

export default {
  name: "TheTitles",

  props: ["limitDays"],

  data() {
    return {
      responseDataFromAPI: [],
      limitArticles: 8,
      pluralWordNumber: String,
      articles: {},
    };
  },

  methods: {
    saveRightArray(filteredArray) {
      Object.create([`${this.limitDays}`]).push(this.articles); // Create object and push them into articles
      this.articles[`${this.limitDays}`] = filteredArray; // Created object fills with data
      this.articles[`${this.limitDays}`].sort((x, y) => { // Sort object from height to low views
        return y.views - x.views;
      });
    },

    plural() { // Make word plural if condition is false
      this.limitDays == 1 
        ? (this.pluralWordNumber = "")
        : (this.pluralWordNumber = "s"); 
    },

    getRequest() {
      if (this.articles[`${this.limitDays}`] == undefined) {
        // If there is a array with the same name in the object, do nothing

        this.responseDataFromAPI == true // If there is something in the array, clean it
          ? (this.responseDataFromAPI.length = 0)
          : false; 

        axios({
          // Ajax request
          method: "GET",
          url: `https://public-api.aktuality.sk/articles/mostread/aktuality?limit=${this.limitArticles}&day${this.pluralWordNumber}=${this.limitDays}`,
        })
          .then((response) => {
            this.responseDataFromAPI = response.data; // Save data
          })
          .catch(() => {
            if (this.limitDays < 2) {
              alert( // If an error occurs
                `Za posledný ${this.limitDays} deň neboli nájdené najčítanejšie články`
              ); 
            } else {
              alert(
                `Za posledné ${this.limitDays} dni neboli nájdené najčítanejšie články`
              );
            }
          });
      }
    },
  },

  mounted() {
    this.plural();
    this.getRequest();
  },

  watch: {
    limitDays() {
      this.plural();
      this.getRequest();
    },

    responseDataFromAPI() {
      let responseFiltered = []; // Create new object

        // Adds specific values from the response to the request ( title, url and views)
      this.responseDataFromAPI.items.forEach((item) => {
        responseFiltered.push({
          title: item.title,
          url: item.url,
          views: item.views,
        });
      });
      this.saveRightArray(responseFiltered); // Send filled object
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  padding: 1rem 0;
  margin: 0 0 1.5rem;
  padding: 0;
  counter-reset: item;

  &__item {
    margin: 0;
    border-radius: 5px;
    text-indent: -1.3rem;
    list-style-type: none;
    counter-increment: item;
    padding: 0.5rem;
    line-height: 1.5rem;
    font: {
      family: $primary-font;
      weight: 400;
    }
    cursor: pointer;
  }

  &__link {
    text-decoration: none;
    color: black;
  }

  &__item:hover {
    transition: 0.5s;
    background-color: #ebebeb;
  }

  &__item:before {
    display: inline-block;
    width: 2rem;
    padding-right: 0.5rem;
    font-weight: bold;
    text-align: right;
    content: counter(item) ".";
  }
}
</style>
