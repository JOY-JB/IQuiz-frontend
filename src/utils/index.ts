import { IPerformerStats, IUser } from "@/types";

export const calculatePerformerStats = (
  performers: IUser[]
): IPerformerStats[] => {
  return performers.map((performer) => {
    const totalAttempts = performer.quizAttempts.length;
    const totalScore = performer.quizAttempts.reduce(
      (sum, attempt) => sum + attempt.score,
      0
    );

    return {
      id: performer.id,
      name: performer.name,
      totalAttempts,
      totalScore,
    };
  });
};

export const calculateSinglePerformerStats = (
  performer: IUser
): Partial<IPerformerStats> => {
  const totalAttempts = performer.quizAttempts?.length;
  const totalScore = performer.quizAttempts?.reduce(
    (sum, attempt) => sum + attempt.score,
    0
  );

  return {
    totalAttempts,
    totalScore,
  };
};
