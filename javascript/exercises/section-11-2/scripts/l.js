function minMax(nums) {
    let min = null;
    let max = null;
    for (let i = 0; i < nums.length; i++) {
        if (!min || nums[i] < min) {
            min = nums[i];
        }
        if (!max || nums[i] > max) {
            max = nums[i];
        }
    }
    return {min, max};
}
console.log(minMax([1, -3, 5]));
console.log(minMax([-2, 3, -5, 7, 10]));