<template>
  <section>
    <div class="lesson">
      <h4>Lesson 1</h4>
      <summary
        :class="[
          (lesson1.length > 0 ? true : false) ? 'color-green' : 'color-orange'
        ]"
      >
        passed: {{ lesson1.length > 0 ? true : false }}
      </summary>
      <template v-if="lesson1.length">
        <div v-for="(item, k) in lesson1" :key="k">
          <a :href="link(item.block, item.index)" target="_blank"
            >view extrinsic</a
          >
          | {{ date(item.time) }} |
          {{ JSON.parse(item.data).blackmirror }}
        </div>
      </template>
    </div>
    <div class="lesson">
      <h4>Lesson 2</h4>
      <summary
        :class="[passed(lesson2.list, 10) ? 'color-green' : 'color-orange']"
      >
        passed: {{ passed(lesson2.list, 10) }} | attempts: {{ lesson2.count }}
      </summary>
      <template v-if="lesson2.list.length">
        <div v-for="(item, k) in lesson2.list" :key="k">
          <a :href="link(item.block, item.index)" target="_blank"
            >view extrinsic</a
          >
          | {{ date(item.time) }} | correct: {{ item.corrects }} |
          {{ Math.ceil((item.corrects * 100) / 17) }}%
          <div v-if="item.corrects >= 15">
            Поздравляем, вы получаете награду для 2 урока, обратитесь в чат
            Дискорд
          </div>
          <div v-else>К сожалению, вы не получаете XRT награду для 2 урока</div>
          <pre>{{ JSON.parse(item.data).data }}</pre>
        </div>
      </template>
    </div>
    <div class="lesson">
      <h4>Lesson 3</h4>
      <summary
        :class="[
          (lesson3.length > 0 ? true : false) ? 'color-green' : 'color-orange'
        ]"
      >
        passed: {{ lesson3.length > 0 ? true : false }}
      </summary>
      <template v-if="lesson3.length">
        <div v-for="(item, k) in lesson3" :key="k">
          <a :href="link(item.block, item.index)" target="_blank"
            >view extrinsic</a
          >
          |
          {{ launch(item.data) }}
        </div>
      </template>
    </div>
    <div class="lesson">
      <h4>Lesson 4</h4>
      <summary
        :class="[passed(lesson4.list, 7) ? 'color-green' : 'color-orange']"
      >
        passed: {{ passed(lesson4.list, 7) }} | attempts: {{ lesson4.count }}
      </summary>
      <template v-if="lesson4.list.length">
        <div v-for="(item, k) in lesson4.list" :key="k">
          <a :href="link(item.block, item.index)" target="_blank"
            >view extrinsic</a
          >
          | {{ date(item.time) }} | correct: {{ item.corrects }} |
          {{ Math.ceil((item.corrects * 100) / 11) }}%
          <div v-if="item.corrects >= 10">
            Поздравляем, вы получаете награду для 4 урока, обратитесь в чат
            Дискорд
          </div>
          <div v-else>К сожалению, вы не получаете XRT награду для 4 урока</div>
          <pre>{{ JSON.parse(item.data).data }}</pre>
        </div>
      </template>
    </div>
    <div class="lesson">
      <h4>Lesson 5</h4>
      <summary
        :class="[
          Boolean(lesson5 && lesson5.ledger && lesson5.devices)
            ? 'color-green'
            : 'color-orange'
        ]"
      >
        passed:
        {{ Boolean(lesson5 && lesson5.ledger && lesson5.devices) }}
      </summary>
    </div>
  </section>
</template>

<script>
import { get } from "../api";

export default {
  props: ["account"],
  data() {
    return {
      lesson1: [],
      lesson2: { list: [], count: 0 },
      lesson3: [],
      lesson4: { list: [], count: 0 },
      lesson5: null
    };
  },
  created() {
    this.getLessons();
  },
  computed: {
    link() {
      return (block, index) => {
        return `https://robonomics.subscan.io/extrinsic/${block}-${index}`;
      };
    },
    date() {
      return (v) => {
        return new Date(Number(v)).toLocaleDateString();
      };
    },
    passed() {
      return (lessons, require) => {
        for (const lesson of lessons) {
          if (lesson.corrects >= require) {
            return true;
          }
        }
        return false;
      };
    },
    launch() {
      return (v) => {
        return v ===
          "0x0000000000000000000000000000000000000000000000000000000000000001"
          ? "on"
          : "off";
      };
    }
  },
  methods: {
    async getLessons() {
      const result = await get(`/user/${this.account}`);
      if (result && result.lesson1) {
        this.lesson1 = result.lesson1;
        this.lesson2 = result.lesson2;
        this.lesson3 = result.lesson3;
        this.lesson4 = result.lesson4;
        this.lesson5 = result.lesson5;
      }
    }
  }
};
</script>

<style scoped>
pre {
  height: 200px;
  overflow-y: scroll;
  border: 1px solid #534e4b;
  padding: 10px;
  font-size: 12px;
}
summary {
  border-radius: var(--gap);
  padding: 0 calc(var(--gap) * 0.4);
  display: inline-block;
  color: var(--color-white);
}
summary.color-orange {
  background-color: var(--color-orange);
}
summary.color-green {
  background-color: var(--color-green);
}
.lesson {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #534e4b;
}
</style>
