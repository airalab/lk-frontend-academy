<template>
  <section>
    <summary v-if="isBonus" class="bonus color-green">
      <i18n-t keypath="user.bonus.text">
        <template #link>
          <a
            href="https://discord.com/channels/803947358492557312/803947358492557315"
            target="_blank"
          >
            {{ $t("user.bonus.link") }}
          </a>
        </template>
      </i18n-t>
    </summary>
    <summary v-else class="bonus color-orange">
      {{ $t("user.bonus.error") }}
    </summary>

    <div class="lesson">
      <h4>{{ $t("user.lesson1") }}</h4>
      <summary
        :class="[
          (lesson1.length > 0 ? true : false) ? 'color-green' : 'color-orange'
        ]"
      >
        {{ lesson1.length > 0 ? $t("user.done") : $t("user.notDone") }}
      </summary>
      <template v-if="lesson1.length">
        <hr />
        <table>
          <thead>
            <tr>
              <th>Extrinsic</th>
              <th>Date</th>
              <th style="text-align: left">Text</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, k) in lesson1" :key="k">
              <td>
                <a :href="link(item.block, item.index)" target="_blank">
                  {{ $t("user.extrinsic") }}
                </a>
              </td>
              <td>{{ date(item.time) }}</td>
              <td style="text-align: left">
                {{ JSON.parse(item.data).blackmirror }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
    <div class="lesson">
      <h4>{{ $t("user.lesson2") }}</h4>
      <summary
        :class="[passed(lesson2.list, 10) ? 'color-green' : 'color-orange']"
      >
        {{ passed(lesson2.list, 10) ? $t("user.done") : $t("user.notDone") }} |
        {{ $t("user.attempts") }}:
        {{ lesson2.count }}
      </summary>

      <template v-if="lesson2.list.length">
        <hr />
        <table>
          <thead>
            <tr>
              <th style="width: 200px">Extrinsic</th>
              <th style="width: 180px">Date</th>
              <th style="width: 100px">{{ $t("user.correct") }}</th>
              <th style="width: 100px">{{ $t("user.correct") }} %</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, k) in lesson2.list" :key="k">
              <tr>
                <td>
                  <a :href="link(item.block, item.index)" target="_blank">
                    {{ $t("user.extrinsic") }}
                  </a>
                </td>
                <td>{{ date(item.time) }}</td>
                <td>{{ item.corrects }}</td>
                <td>{{ Math.ceil((item.corrects * 100) / 17) }}%</td>
                <td>
                  <button
                    @click="
                      viewLesson2Index === k
                        ? (viewLesson2Index = null)
                        : (viewLesson2Index = k)
                    "
                    class="btn-preview"
                  >
                    <template v-if="viewLesson2Index !== k">show</template>
                    <template v-else>hide</template>
                  </button>
                </td>
              </tr>
              <tr v-show="k === viewLesson2Index">
                <td colspan="5">
                  <pre>
                    {{ JSON.parse(item.data).data }}
                  </pre>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </template>
    </div>
    <div class="lesson">
      <h4>{{ $t("user.lesson3") }}</h4>
      <summary
        :class="[
          (lesson3.length > 0 ? true : false) ? 'color-green' : 'color-orange'
        ]"
      >
        {{ lesson3.length > 0 ? $t("user.done") : $t("user.notDone") }}
      </summary>
      <template v-if="lesson3.length">
        <hr />
        <table>
          <thead>
            <tr>
              <th style="width: 200px">Extrinsic</th>
              <th style="text-align: left">Text</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, k) in lesson3" :key="k">
              <td>
                <a :href="link(item.block, item.index)" target="_blank">
                  {{ $t("user.extrinsic") }}
                </a>
              </td>
              <td style="text-align: left">{{ launch(item.data) }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
    <div class="lesson">
      <h4>{{ $t("user.lesson4") }}</h4>
      <summary
        :class="[passed(lesson4.list, 7) ? 'color-green' : 'color-orange']"
      >
        {{ passed(lesson4.list, 7) ? $t("user.done") : $t("user.notDone") }} |
        {{ $t("user.attempts") }}:
        {{ lesson4.count }}
      </summary>

      <template v-if="lesson4.list.length">
        <hr />
        <table>
          <thead>
            <tr>
              <th style="width: 200px">Extrinsic</th>
              <th style="width: 180px">Date</th>
              <th style="width: 100px">{{ $t("user.correct") }}</th>
              <th style="width: 100px">{{ $t("user.correct") }} %</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, k) in lesson4.list" :key="k">
              <tr>
                <td>
                  <a :href="link(item.block, item.index)" target="_blank">
                    {{ $t("user.extrinsic") }}
                  </a>
                </td>
                <td>{{ date(item.time) }}</td>
                <td>{{ item.corrects }}</td>
                <td>{{ Math.ceil((item.corrects * 100) / 17) }}%</td>
                <td>
                  <button
                    @click="
                      viewLesson4Index === k
                        ? (viewLesson4Index = null)
                        : (viewLesson4Index = k)
                    "
                    class="btn-preview"
                  >
                    <template v-if="viewLesson4Index !== k">show</template>
                    <template v-else>hide</template>
                  </button>
                </td>
              </tr>
              <tr v-show="k === viewLesson4Index">
                <td colspan="5">
                  <pre>
                    {{ JSON.parse(item.data).data }}
                  </pre>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </template>
    </div>
    <div class="lesson">
      <h4>{{ $t("user.lesson5") }}</h4>
      <summary
        :class="[
          Boolean(lesson5 && lesson5.ledger && lesson5.devices)
            ? 'color-green'
            : 'color-orange'
        ]"
      >
        {{
          Boolean(lesson5 && lesson5.ledger && lesson5.devices)
            ? $t("user.done")
            : $t("user.notDone")
        }}
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
      lesson5: null,
      viewLesson2Index: null,
      viewLesson4Index: null
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
    },
    isBonus() {
      if (
        this.lesson2.list.length > 0 &&
        this.lesson4.list.length > 0 &&
        this.lesson2.list[this.lesson2.list.length - 1].corrects >= 15 &&
        this.lesson4.list[this.lesson4.list.length - 1].corrects >= 10
      ) {
        return true;
      }
      return false;
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
        this.viewLesson2Index = this.lesson2.count - 1;
        this.viewLesson4Index = this.lesson4.count - 1;
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
  text-align: left;
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
.bonus {
  margin: 20px 0;
}
.btn-preview {
  padding: 2px 10px;
  font-size: 14px;
}

table {
  width: 100%;
}
table th {
  padding: 5px;
  font-size: 14px;
}
table td {
  padding: 5px;
  text-align: center;
  border-right: 1px solid #eee;
}
table tbody tr:hover {
  background-color: #e9e9e9;
}
hr {
  margin: 10px 0;
  border: 0;
  border-top: 1px solid #999999;
}
</style>
