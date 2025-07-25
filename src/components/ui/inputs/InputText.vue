<script setup lang="ts">
import { ref } from 'vue';

const model = defineModel();

const props = withDefaults(
    defineProps<{
        isValid?: boolean | string;
    }>(),
    {
        isValid: true,
    }
);

const emit = defineEmits<{
    (e: 'blur'): void;
}>();

const isTouched = ref(false);

const onBlur = () => {
    isTouched.value = true;

    emit('blur');
};
</script>

<template>
    <div class="flex flex-col">
        <input
            v-model="model"
            class="border-2 rounded-lg p-1"
            :class="isTouched && props.isValid !== true ? 'border-red-500 outline-red-500' : ''"
            type="text"
            @blur="onBlur"
        />

        <div class="min-h-[30px] pl-2 text-[12px] text-red-500">
            <span v-if="isTouched && props.isValid !== true">{{ props.isValid }}</span>
        </div>
    </div>
</template>
