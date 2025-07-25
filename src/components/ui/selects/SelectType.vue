<script setup lang="ts">
import { computed, ref } from 'vue';

import { useAccountsStore } from '@/stores/accounts-store/accountsStore.ts';
import { storeToRefs } from 'pinia';
const accountStore = useAccountsStore();
const { recordTypes } = storeToRefs(accountStore);

const model = defineModel();

const typeName = computed(() => {
    return recordTypes.value.find((type) => type.key === model.value)?.name;
});

const onClickSelectItem = (key: string) => {
    model.value = recordTypes.value.find((type) => type.key === key)?.key;
};

const isOpen = ref(false);
</script>

<template>
    <div
        class="relative select-none cursor-pointer border-2 rounded-lg p-1"
        @click="isOpen = !isOpen"
        @mouseleave="isOpen = false"
    >
        <span>{{ typeName }}</span>

        <div
            class="z-1 absolute left-[-2px] top-[105%] w-[calc(100%+4px)] overflow-hidden origin-top transition-transform duration-200 rounded-lg"
            :class="isOpen ? 'scale-y-100' : 'scale-y-0'"
        >
            <div
                class="p-1 bg-gray-200 hover:bg-gray-300"
                v-for="type in recordTypes"
                :key="type.key"
                @click="onClickSelectItem(type.key)"
            >
                {{ type.name }}
            </div>
        </div>
    </div>
</template>
