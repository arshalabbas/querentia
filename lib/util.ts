export const multiAvatarUrl = (imageSeed: string | number) =>
  `https://api.multiavatar.com/${imageSeed}.png`;

export function calculateProgress(poll: any) {
  if (!poll) return;
  // Calculate the total number of votes across all options
  const totalVotes = poll.options.reduce(
    (acc: any, option: any) => acc + option.votes.length,
    0
  );

  // Calculate the progress percentage for each option
  const progressPercentages = poll.options.map((option: any) => ({
    id: option.id,
    title: option.title,
    progress: totalVotes === 0 ? 0 : (option.votes.length / totalVotes) * 100,
  }));

  return progressPercentages;
}
