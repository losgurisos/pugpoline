var GoalHelper = {
  // get position for goal starting from platform'goal Position
  getGoalPositionFromPlatformPosition: function(platformX, platformY){
    return {
      x: platformX,
      y: platformY - GOALS_PLATFORM_HEIGHT/2 - GOALS_HEIGHT/2
    }
  }
}
