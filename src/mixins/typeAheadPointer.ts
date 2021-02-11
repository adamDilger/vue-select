import { watch, ref, Ref } from 'vue';

export default function(filteredOptions: Array<any>, selectable: Function, select: Function) {

  const typeAheadPointer = ref<number>(-1);

  watch(filteredOptions, () => {
    for (let i = 0; i < filteredOptions.length; i++) {
      if (selectable(filteredOptions[i])) {
        typeAheadPointer.value = i;
        break;
      }
    }
  })

  /**
   * Move the typeAheadPointer visually up the list by
   * setting it to the previous selectable option.
   * @return {void}
   */
  function typeAheadUp(): void {
    for (let i = typeAheadPointer.value - 1; i >= 0; i--) {
      if (selectable(filteredOptions[i])) {
        typeAheadPointer.value = i;
        break;
      }
    }
  }

  /**
   * Move the typeAheadPointer visually down the list by
   * setting it to the next selectable option.
   * @return {void}
   */
  function typeAheadDown(): void {
    for (let i = typeAheadPointer.value + 1; i < filteredOptions.length; i++) {
      if (selectable(filteredOptions[i])) {
        typeAheadPointer.value = i;
        break;
      }
    }
  }

  /**
   * Select the option at the current typeAheadPointer position.
   * Optionally clear the search input on selection.
   * @return {void}
   */
  function typeAheadSelect(): void {
    const typeAheadOption = filteredOptions[typeAheadPointer.value];

    if (typeAheadOption) {
      select(typeAheadOption);
    }
  }

  return {
    typeAheadPointer,

    typeAheadDown,
    typeAheadUp,
    typeAheadSelect,
  }
}
