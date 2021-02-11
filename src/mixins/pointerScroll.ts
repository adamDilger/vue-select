import { watch, ref, Ref } from 'vue';

export default function(dropdownMenu: Ref<HTMLUListElement>, typeAheadPointer: Ref<number>) {
  const autoscroll = ref<boolean>(true);

  /**
   * Adjust the scroll position of the dropdown list
   * if the current pointer is outside of the
   * overflow bounds.
   * @returns {*}
   */
  function maybeAdjustScroll(): number | undefined {
    const optionEl = dropdownMenu.value?.children[typeAheadPointer.value] as HTMLOptionElement;

    if (optionEl) {
      const bounds = getDropdownViewport();
      const { top, bottom, height } = optionEl.getBoundingClientRect();

      if (top < bounds.top) {
        return (dropdownMenu.value.scrollTop = optionEl.offsetTop);
      } else if (bottom > bounds.bottom) {
        return (dropdownMenu.value.scrollTop =
          optionEl.offsetTop - (bounds.height - height));
      }
    }
  }

  /**
   * The currently viewable portion of the dropdownMenu.
   * @returns {{top: (string|*|number), bottom: *}}
   */
  function getDropdownViewport(): DOMRect {
    if (!dropdownMenu.value) {
      return {
        height: 0,
        top: 0,
        bottom: 0
      } as DOMRect;
    }

    return dropdownMenu.value.getBoundingClientRect();
  }

  watch(autoscroll, (val) => val && maybeAdjustScroll());

  return {
    autoscroll,
  }
}
