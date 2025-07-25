<script setup lang="ts">
import IconEyeCrossed from '@/components/icons/IconEyeCrossed.vue';
import IconEye from '@/components/icons/IconEye.vue';

import { ref } from 'vue';

const model = defineModel();

withDefaults(
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

const isHide = ref(true);
</script>

<template>
    <div class="flex flex-col">
        <label class="relative">
            <input
                v-model="model"
                class="border-2 rounded-lg p-1 pr-9 w-[100%]"
                :class="isTouched && isValid !== true ? 'border-red-500 outline-red-500' : ''"
                :type="isHide ? 'password' : 'text'"
                @blur="onBlur"
            />
            <span class="absolute right-2 top-1/2 -translate-y-1/2" @click="isHide = !isHide">
                <IconEyeCrossed v-if="isHide" class="w-[24px] h-[24px] cursor-pointer" />
                <IconEye v-else class="w-[24px] h-[24px] cursor-pointer" />
            </span>
        </label>

        <div class="min-h-[30px] pl-2 text-[12px] text-red-500">
            <span v-if="isTouched && isValid !== true">{{ isValid }}</span>
        </div>
    </div>
</template>
