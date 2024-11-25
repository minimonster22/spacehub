<template>
  <HeaderPage>
    <template #back-btn>
      <router-link to="/">
        <n-button ghost color="#8a2be2" class="btn">
          <template #icon>
            <n-icon>
              <Home28Regular />
            </n-icon>
          </template>
        </n-button>
      </router-link>
    </template>
    <template #header-title>
      Уведомления по солнечным событиям
    </template>
  </HeaderPage>

  <div class="calendar-wrapper">
    <n-calendar
        v-model:value="value"
        @on-update:value="handleUpdateValue"
        class="calendar"
    >
      <template #default="{ year, month, date, timestamp }">
        <div
            :class="{
            'calendar-cell': true,
            'range-start': isRangeStart(year, month, date),
            'range-end': isRangeEnd(year, month, date),
            'in-range': isInRange(year, month, date),
            'disabled': isDateDisabled(timestamp),
          }"
            @click="handleDateClick(year, month, date)"
        >
        </div>
      </template>
    </n-calendar>
  </div>

  <div>
    <h2>Данные с NASA API:</h2>
    <div v-if="apiData.length">
      <div class="card-list">
        <n-card
            v-for="item in apiData"
            :key="item.messageID"
            class="notification-card"
        >
          <template #header>
            <strong>Тип сообщения:</strong> {{ item.messageType }}
          </template>
          <template #default>
            <p><strong>Время:</strong> {{ item.messageIssueTime }}</p>
            <div :class="['message-body', { collapsed: !item.isExpanded }]">
              <pre class="formatted-text">{{ formatMessageBody(item.messageBody) }}</pre>
            </div>
            <n-button v-if="item.messageBody.length > 500" @click="toggleExpand(item)">
              {{ item.isExpanded ? "Свернуть" : "Продолжить далее" }}
            </n-button>
          </template>
        </n-card>
      </div>
    </div>
    <p v-else>Нет данных для отображения</p>
  </div>
</template>

<script setup>
import HeaderPage from "@/components/HeaderPage.vue";
import { NButton, NCalendar, NIcon } from "naive-ui";
import { Home28Regular } from "@vicons/fluent";
import { ref, watch } from "vue";
import { useNotification } from 'naive-ui';

const notification = useNotification();

const apiKey = process.env.VUE_APP_NASA_API_KEY;
const apiData = ref([]);

const rangeStart = ref(null);
const rangeEnd = ref(null);

const value = ref(null);

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Запрос данных с API
async function fetchData() {
  if (!rangeStart.value || !rangeEnd.value) return;

  const timeDifference = rangeEnd.value - rangeStart.value;
  if (timeDifference > 30 * 24 * 60 * 60 * 1000) {
    alert('Диапазон дат не может превышать 30 дней. Уменьшите диапазон.');
    return;
  }

  const startDate = formatDate(rangeStart.value);
  const endDate = formatDate(rangeEnd.value);
  const url = `https://api.nasa.gov/DONKI/notifications?startDate=${startDate}&endDate=${endDate}&type=all&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ошибка API");
    apiData.value = await response.json();
  } catch (error) {
    console.error(error);
  }
}

watch([rangeStart, rangeEnd], fetchData);


function handleDateClick(year, month, date) {
  const selectedDate = new Date(year, month - 1, date);

  if (!rangeStart.value || rangeEnd.value) {
    rangeStart.value = selectedDate;
    rangeEnd.value = null;
  } else if (selectedDate >= rangeStart.value) {
    rangeEnd.value = selectedDate;
  } else {
    rangeStart.value = selectedDate;
    rangeEnd.value = null;
  }

  if (!rangeStart.value || !rangeEnd.value) {
    notification.warning({
      title: 'Выберите период',
      content: 'Пожалуйста, выберите начальную и конечную дату диапазона.',
      duration: 3000,
    });
  }
}

// Функции для календаря
function isInRange(year, month, date) {
  const d = new Date(year, month - 1, date);
  return rangeStart.value && rangeEnd.value && d > rangeStart.value && d < rangeEnd.value;
}

function isRangeStart(year, month, date) {
  const d = new Date(year, month - 1, date);
  return rangeStart.value && d.getTime() === rangeStart.value.getTime();
}

function isRangeEnd(year, month, date) {
  const d = new Date(year, month - 1, date);
  return rangeEnd.value && d.getTime() === rangeEnd.value.getTime();
}

function handleUpdateValue(timestamp) {
  value.value = timestamp;
}

function isDateDisabled(timestamp) {
  return timestamp < Date.now();
}

function formatMessageBody(messageBody) {
  try {
    return JSON.parse(`"${messageBody}"`).replace(/\\n/g, "\n");
  } catch (error) {
    console.error('Ошибка форматирования сообщения:', error);
    return messageBody;
  }
}

function toggleExpand(item) {
  item.isExpanded = !item.isExpanded;
}
</script>


<style scoped>
.calendar-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  position: absolute;
  top: 0;
  left: 0;
}

:deep(.n-calendar-cell) {
  background-color: #18181c;
  color: white;
  position: relative;
}

:deep(.n-calendar-cell:has(.range-start)) {
  background-color: #8a2be2;
  color: white;
}

:deep(.n-calendar-cell:has(.range-end)) {
  background-color: #8a2be2;
  color: white;
}

:deep(.n-calendar-cell:has(.in-range)) {
  background-color: #623098;
  color: #8a2be2;
}

:deep(.n-calendar-cell--current .n-calendar-date__date){
  background-color: #6a11cb !important;
}
:deep(.n-calendar .n-calendar-cell.n-calendar-cell--selected .n-calendar-cell__bar){
  background-color: #6a11cb !important;
}

:deep(.n-calendar-date) {
  width: min-content;
}

.calendar {
  width: 500px;
  height: 500px;
}

.calendar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.formatted-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

:deep(.notification-card){
  width: 500px;
}
:deep(.card-list){
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.message-body {
  max-height: 200px;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

.message-body.collapsed {
  max-height: 215px;
}

.message-body:not(.collapsed) {
  max-height: min-content;
}

@media (max-width: 600px) {
  .calendar {
    width: 400px;
    height: 400px;
  }
  .formatted-text {
    font-size: small;
  }

}

</style>
