<template>
  <section id="timeline">
    <div class="task-section">
      <h2>Development status</h2>
      <div class="filter-menu">
        <div class="filter-group">
          <h3>Status</h3>
          <div class="filter-options">
            <label v-for="status in statuses" :key="status">
              <input 
                type="checkbox" 
                v-model="selectedStatuses" 
                :value="status"
                @change="filterTasks"
              >
              <span>{{ status }}</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <h3>Years</h3>
          <div class="filter-options">
            <label v-for="year in years" :key="year">
              <input 
                type="checkbox" 
                v-model="selectedYears" 
                :value="year"
                @change="filterTasks"
              >
              <span>{{ year }}</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <h3>Priority</h3>
          <div class="filter-options">
            <label v-for="priority in priorities" :key="priority">
              <input 
                type="checkbox" 
                v-model="selectedPriorities" 
                :value="priority"
                @change="filterTasks"
              >
              <span>{{ priority }}</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <h3>Tags</h3>
          <div class="filter-options">
            <label v-for="tag in tags" :key="tag">
              <input 
                type="checkbox" 
                v-model="selectedTags" 
                :value="tag"
                @change="filterTasks"
              >
              <span>{{ tag }}</span>
            </label>
          </div>
        </div>
      </div>
      <div class="task-grid">
        <div v-for="(task, index) in filteredTasks" 
             :key="index" 
             class="task-card" 
             :class="{ 
               'completed': task.status === 'Completed', 
               'in-progress': task.status === 'In Progress',
               'is-animated': isPreRendered 
             }">
          <div class="task-date">{{ task.year }} {{ task.quarter }}</div>
          <h3 class="task-title">{{ task.name }}</h3>
          <p class="task-description">{{ task.description }}</p>
          <div class="task-meta">
            <span class="task-tag">{{ task.tag }}</span>
            <span class="task-status" :class="task.status.toLowerCase()">{{ task.status }}</span>
          </div>
        </div>
      </div>
    </div>

  </section>
  <h4>You can contribute to the project by creating an issue for new ideas on <a href="https://github.com/canxium/docs/issues/new">GitHub</a>.</h4>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import tasks from '../tasks_section/tasks'

const preRendered = ref(false)
const showRoadmapLink = ref(true)
const activeTask = ref(0)

// Filter states
const selectedStatuses = ref([])
const selectedYears = ref([])
const selectedPriorities = ref([])
const selectedTags = ref([])

// Available options
const statuses = computed(() => [...new Set(tasks.map(t => t.status))])
const years = computed(() => [...new Set(tasks.map(t => t.year))])
const priorities = computed(() => ['High', 'Medium', 'Low'])
const tags = computed(() => [...new Set(tasks.map(t => t.tag))])

// Filtered tasks
const filteredTasks = computed(() => {
  return tasks.filter(task => {
    const statusMatch = selectedStatuses.value.length === 0 || selectedStatuses.value.includes(task.status)
    const yearMatch = selectedYears.value.length === 0 || selectedYears.value.includes(task.year)
    const tagMatch = selectedTags.value.length === 0 || selectedTags.value.includes(task.tag)
    const priorityMatch = selectedPriorities.value.length === 0 || selectedPriorities.value.includes(task.priority)
    return statusMatch && yearMatch && tagMatch && priorityMatch
  }).sort((a, b) => {
    // Sort theo index giảm dần (desc)
    return b.index - a.index
  })
})

const filterTasks = () => {
  // Update the tasks list based on selected filters
  // This will automatically update the timeline and task cards
}

const scrollToTask = (index) => {
  const container = document.getElementById('timeline-container')
  const taskElements = container.getElementsByClassName('is-animated')
  if (taskElements[index]) {
    taskElements[index].scrollIntoView({ behavior: 'smooth', block: 'center' })
    activeTask.value = index
  }
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(entry.target.parentElement.children).indexOf(entry.target)
        activeTask.value = index
      }
    })
  }, { threshold: 0.5 })

  const taskElements = document.querySelectorAll('#timeline-container .is-animated')
  taskElements.forEach(element => observer.observe(element))
})
  
  const isPreRendered = ref(false)
  
  onMounted(() => {
    isPreRendered.value = true
  })
  
  const updateFilteredTasks = (tasks) => {
    filteredTasks.value = tasks
  }
</script>

<style lang="scss" scoped>
/* Light theme (default) */
:root {
  --card-bg: var(--vt-c-gray-light-4);
  --card-border: var(--vt-c-divider);
  --card-hover-bg: var(--vt-c-gray-light-3);
  --card-hover-border: var(--vt-c-brand);
  --card-shadow: var(--vt-shadow-1);
  --text-primary: var(--vt-c-text-1);
  --text-secondary: var(--vt-c-text-2);
  --accent-color: var(--vt-c-brand);
  --divider-color: var(--vt-c-divider);
  --tag-bg: var(--vt-c-brand-soft);
  --tag-color: var(--vt-c-brand);
  --status-completed: var(--vt-c-brand);
  --status-completed-bg: var(--vt-c-brand-soft);
  --status-completed-color: var(--vt-c-brand);
  --status-in-progress-bg: var(--vt-c-warning-soft);
  --status-in-progress-color: var(--vt-c-warning);
  --status-planned-bg: var(--vt-c-gray-light-4);
  --status-planned-color: var(--vt-c-text-2);
}

/* Dark theme */
.dark {
  --card-bg: var(--vt-c-gray-dark-3);
  --card-border: var(--vt-c-divider);
  --card-hover-bg: var(--vt-c-gray-dark-2);
  --card-hover-border: var(--vt-c-brand);
  --card-shadow: var(--vt-shadow-1);
  --text-primary: var(--vt-c-text-1);
  --text-secondary: var(--vt-c-text-2);
  --accent-color: var(--vt-c-brand);
  --divider-color: var(--vt-c-divider);
  --tag-bg: var(--vt-c-brand-soft);
  --tag-color: var(--vt-c-brand);
  --status-completed: var(--vt-c-brand);
  --status-completed-bg: var(--vt-c-brand-soft);
  --status-completed-color: var(--vt-c-brand);
  --status-in-progress-bg: var(--vt-c-warning-soft);
  --status-in-progress-color: var(--vt-c-warning);
  --status-planned-bg: var(--vt-c-gray-dark-3);
  --status-planned-color: var(--vt-c-text-2);
}

#timeline {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  margin: 0 auto;
  padding: 0 20px;

  .filter-menu {
    width: 100%;
    margin: 0 auto 2rem;
    padding: 1rem;
    background: rgba(0, 25, 21, 0.5);
    border: 1px solid #00342A;
    border-radius: 8px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    .filter-group {
      margin-bottom: 0;

      h3 {
        color: #02FFCF;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        margin-top: 0.5rem;
      }

      .filter-options {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.8);
          transition: color 0.3s ease;
          font-size: 0.95rem;

          &:hover {
            color: #02FFCF;
          }

          input[type="checkbox"] {
            appearance: none;
            width: 16px;
            height: 16px;
            border: 1px solid #00342A;
            border-radius: 3px;
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;

            &:checked {
              background: #02FFCF;
              border-color: #02FFCF;

              &:after {
                content: '';
                position: absolute;
                left: 4px;
                top: 1px;
                width: 5px;
                height: 10px;
                border: solid #001915;
                border-width: 0 2px 2px 0;
                transform: rotate(45deg);
              }
            }
          }
        }
      }
    }
  }

  .task-section {
    width: 100%;
    margin: 0 auto 4rem;
    padding: 0;

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #02FFCF;
      font-size: 2rem;
    }

    .task-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .task-card {
      position: relative;
      background: var(--card-bg, rgba(0, 25, 21, 0.5));
      border: 1px solid var(--card-border, #00342A);
      border-radius: 8px;
      padding: 1.5rem;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease;
      display: flex;
      flex-direction: column;
      height: 100%;

      &.is-animated {
        opacity: 1;
        transform: translateY(0);
      }

      &:hover {
        transform: translateY(-5px);
        border-color: var(--card-hover-border, #02FFCF);
        box-shadow: 0 5px 15px var(--card-shadow, rgba(0, 0, 0, 0.3));
        background: var(--card-hover-bg, rgba(0, 25, 21, 0.7));
      }

      &.completed {
        border-color: var(--status-completed, #02FFCF);
      }

      &.in-progress {
        border-color: var(--status-in-progress-color, #FFA500);
        border-width: 2px;
        box-shadow: 0 0 10px rgba(255, 165, 0, 0.2);
      }

      .task-date {
        font-size: 0.9rem;
        color: var(--text-secondary, rgba(255, 255, 255, 0.8));
        margin-bottom: 0.5rem;
        display: block;
      }

      .task-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: var(--text-primary, #ffffff);
        position: relative;
        padding-bottom: 1rem;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-color, #02FFCF), transparent);
        }
      }

      .task-description {
        color: var(--text-secondary, rgba(255, 255, 255, 0.7));
        line-height: 1.6;
        margin-bottom: 1.5rem;
        font-size: 0.95rem;
        flex: 1;
      }

      .task-meta {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-top: auto;
        padding-top: 1rem;
        border-top: 1px solid var(--divider-color, rgba(255, 255, 255, 0.1));
      }

      .task-tag {
        background: var(--tag-bg, rgba(2, 255, 207, 0.1));
        color: var(--tag-color, #02FFCF);
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.9rem;
      }

      .task-status {
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.85rem;
        font-weight: 500;

        &.completed {
          background: var(--status-completed-bg, rgba(2, 255, 207, 0.1));
          color: var(--status-completed-color, #02FFCF);
        }

        &.in-progress {
          background: var(--status-in-progress-color, #FFA500);
          color: #000000;
          font-weight: 600;
          box-shadow: 0 0 8px rgba(255, 165, 0, 0.4);
          border: 1px solid rgba(255, 165, 0, 0.6);
        }

        &.planned {
          background: var(--status-planned-bg, rgba(255, 255, 255, 0.1));
          color: var(--status-planned-color, rgba(255, 255, 255, 0.8));
        }
      }
    }
  }

  .timeline-nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;

    button {
      background: transparent;
      border: 1px solid #00342A;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        border-color: #02FFCF;
        color: #02FFCF;
      }

      &.active {
        background: #02FFCF;
        border-color: #02FFCF;
        color: #001915;
      }
    }
  }

  a {
    border: thin solid rgb(255 255 255 / 70%);
    padding: .8rem 1rem;
    white-space: nowrap;
    display: inline-flex;
    gap: 1rem;
    align-items: center;

    &:hover {
      border: thin solid #02FFCF;
    }

    &:hover svg {
      color: thin solid #02FFCF;
    }
  }

  h2 {
    text-align: center;
  }

  #timeline-container {
    font-size: 1.8rem;
    display: flex;
    padding-top: 2rem;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 2rem;
    
    >div {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 15rem;

      >div {
        text-align: center;
      }

      .top {
        height: 6rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
      }

      .bottom {
        height: 10rem;
      }

      .top> :first-child,
      .bottom> :first-child {
        color: #02FFCF;
      }

      .circle {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
        margin: 1rem 0;

        >div {
          position: relative;
          width: 20px;
          height: 20px;
          background: #001915;
          border: 2px solid #00342A;
          border-radius: 50%;
        }

        &:before,
        &:after {
          content: "";
          position: absolute;
          top: 50%;
          z-index: -1;
          width: 50%;
          height: 2px;
          background: #00342A;
          transform: translateY(-50%);
        }

        &:before {
          left: 0;
        }

        &:after {
          right: 0;
        }
      }

      &.done {
        .circle:before,
        .circle:after {
          background: #02FFCF;
        }

        .circle>div {
          background: #004C3E;
          border: 2px solid #02FFCF;
        }
      }
    }
  }
}

@media screen and (max-width: 1440px) {
  #timeline {
    width: 100%;

    .filter-menu {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .task-section {
      .task-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  #timeline {
    .filter-menu {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 0.75rem;
    }

    .task-section {
      .task-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  #timeline {
    .filter-menu {
      grid-template-columns: 1fr;
      gap: 0.75rem;
      padding: 0.75rem;
    }

    .task-section {
      .task-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style> 
