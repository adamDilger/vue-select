import { watch, Ref, ref, SetupContext } from 'vue';

/**
 * Toggles the adding of a 'loading' class to the main
 * .v-select wrapper. Useful to control UI state when
 * results are being processed through AJAX.
 */
export default function(emit: Function, loading: Ref<boolean>, search: Ref<string>) {

  const mutableLoading = ref<boolean>(false);

  /**
   * Anytime the search string changes, emit the
   * 'search' event. The event is passed with two
   * parameters: the search string, and a function
   * that accepts a boolean parameter to toggle the
   * loading state.
   *
   * @emits search
   */
  watch(search, (val) => emit('search', val, toggleLoading));

  /**
   * Sync the loading prop with the internal
   * mutable loading value.
   * @param val
   */
  watch(loading, (val) => mutableLoading.value = val);

  /**
   * Toggle this.loading. Optionally pass a boolean
   * value. If no value is provided, this.loading
   * will be set to the opposite of it's current value.
   * @param toggle Boolean
   * @returns {*}
   */
  function toggleLoading(toggle: boolean | null = null): boolean {
    if (toggle == null) {
      return (mutableLoading.value = !mutableLoading.value);
    }
    return (mutableLoading.value = toggle);
  }

  return {
    toggleLoading,
    mutableLoading,
  }
};
