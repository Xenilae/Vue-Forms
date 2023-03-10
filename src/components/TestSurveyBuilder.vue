<script>
import SurveyBuilder from "@/components/SurveyBuilder.vue";
import QuestionsView from './QuestionsView';
import {onMounted} from "vue";

export default {
  name: 'TestSurveyBuilder',
  data: () => ({
      questionsList: [],
      addQuestion: false,
      sampleQuestion: null,
  }),
  components: { SurveyBuilder, QuestionsView },
  setup() {
    onMounted(() => {
      window.addEventListener("add-update-question", (event) => {
        const { question, operation } = event.detail;
        if (operation === 'save') {
          this.updateQuestionsList(question);
        } else if (operation === 'delete') {
          this.deleteQuestion(question);
        }
      });
    });
  },

  methods: {
    updateQuestionsList(question) {
      const questionIndex = this.questionsList.findIndex(x => x.id === question.id);
      if (questionIndex >= 0) {
        this.questionsList.splice(questionIndex, 1, question);
      } else {
        this.questionsList.push(JSON.parse(JSON.stringify(question)));
      }
      this.$root.$emit('selected-question', null);
    },

    addNewQuestion() {
      this.sampleQuestion = {
        type: 'DEFAULT',
        text: '',
        required: false,
        options: [],
        labels: [],
        id: this.getGUID(),
      };
      this.addQuestion = true;
    },

    deleteQuestion(question) {
      const questionIndex = this.questionsList.findIndex(x => x.id === question.id);
      if (questionIndex >= 0) {
        this.questionsList.splice(questionIndex, 1);
      }
    },

    getGUID() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      }
      return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    },
  },
};
</script>

<template>
  <div class="test-survey-builder">
    <h2 class="text-center">Vue Survey Builder Demo</h2>
    <hr/>
    <QuestionsView
        :questions="questionsList"
        :read-only="true"
        @delete-question="deleteQuestion"
    ></QuestionsView>
    <div v-if="addQuestion">
      <SurveyBuilder :options="sampleQuestion" />
    </div>
    <div class="pt-10">
      <button type="button" class="add_another_btn br-25" v-on:click="addNewQuestion()">Add question</button>
    </div>
    <div class="pt-10">
      <button type="button" class="add_another_btn br-25" v-on:click="updateQuestionsList()">Update question</button>
    </div>
  </div>
</template>

<style scoped>
.add_another_btn {
  font-size: 14px;
  background-color: transparent;
  border-color: #4c8ce4;
  color: #4c8ce4;
  padding: 8px;
  cursor: pointer;
}
.text-center {
  text-align: center;
}
</style>