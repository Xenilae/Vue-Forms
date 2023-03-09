import { createRouter, createWebHistory } from 'vue-router'
import TestSurveyBuilder from "@/components/TestSurveyBuilder.vue";

const routes = [
    {
        path: '/',
        name: 'survey',
        component: TestSurveyBuilder
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
