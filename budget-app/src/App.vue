<template>
  <div id="app">
    <ul v-for="(dataItem, index) in items" :key="index">
      <li>Index: {{ index }}</li>
      <li>{{ dataItem }}</li>
      <li>Name: {{ Object.keys(dataItem).toString() }}</li>
      <li>Id: {{ Object.values(dataItem)[0][0].id }}</li>
      <li>Budgets: {{ Object.values(dataItem)[0][0].budget.join(", ") }}</li>
    </ul>

    <form>
      <input v-model="categoryName" placeholder="Category Name" />
      <input v-model="budget" placeholder="Budget" />
      <button @click.prevent="addNew">Create</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  data() {
    return {
      items: [],
      item: "",
      budget: "",
      categoryName: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000")
      .then((res) => {
        console.log("data: ", res.data);
        for (let i = 0; i < res.data.length; i++) {
          console.log("::: ", Object.keys(res.data[i]));
          this.items.push(res.data[i]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*mounted() {
    axios
      .get("http://localhost:3000")
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.items.push(res.data[i]);
        }
        console.log(this.items);
      })
      .catch((err) => {
        console.log(err);
      });
  },*/

  methods: {
    addNew() {
      let categoryName = this.categoryName;
      let newItem = {
        [categoryName]: [
          {
            id: this.items.length + 1,
            budget: [this.budget],
          },
        ],
      };
      axios.post("http://localhost:3000", newItem).then((res) => {
        this.items.push(newItem);
        console.log(res);
      });
      this.categoryName = "";
      this.budget = "";
    },
    /*addNew() {
      let newItem = {
        id: this.items.length + 1,
        firstName: this.fName,
        lastName: this.lName,
        age: this.age,
      };
      axios.post("http://localhost:3000", newItem).then((res) => {
        this.items.push(newItem);
        console.log(res);
      });
      this.fName = "";
      this.lName = "";
      this.age = "";
    },*/
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
