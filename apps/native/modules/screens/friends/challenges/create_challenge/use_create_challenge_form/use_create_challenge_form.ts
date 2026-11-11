import { router } from "expo-router";
import { useMemo } from "react";
import { useAuth0 } from "react-native-auth0";

import { ChallengeType } from "../../../../../../__generated__/types";
import type { ChallengeGroupsQuery } from "../../challenges_groups/use_challenge_groups/challenge_groups.query.generated";
import { useChallengeGroups } from "../../challenges_groups/use_challenge_groups/use_challenge_groups";
import { useCreateChallengeMutation } from "../create_challenge.mutation.generated";
import { CreateChallengeFormSchema } from "../create_challenge_form_schema";

import { useZodForm } from "@/modules/forms/use_zod_form/use_zod_form";
import { haptic } from "@/modules/haptics/haptic";

type UseCreateChallengeFormArgs = {
  groupId: number;
};

export const useCreateChallengeForm = ({
  groupId,
}: UseCreateChallengeFormArgs) => {
  const { user } = useAuth0();
  const groupsQuery = useChallengeGroups();
  const [createChallenge] = useCreateChallengeMutation();

  const methods = useZodForm({
    schema: CreateChallengeFormSchema,
    defaultValues: {
      recipientId: "",
      type: ChallengeType.BeatGame,
      gameId: null,
      description: "",
    },
  });

  const members = useMemo(() => {
    const currentGroup = groupsQuery.data?.challengeGroups.find(
      (group) => Number(group.id) === groupId,
    );
    return (currentGroup?.members ?? []).filter(
      (member) => member.oauthId !== user?.sub,
    );
  }, [groupsQuery.data, groupId, user?.sub]);

  const onSubmit = methods.handleSubmit(async (data) => {
    if (data.gameId === null) {
      return;
    }
    haptic.medium();
    const { errors } = await createChallenge({
      variables: {
        groupId,
        recipientOauthId: data.recipientId,
        input: {
          type: data.type,
          gameId: data.gameId,
          description: data.description.trim() || null,
        },
      },
      refetchQueries: ["Challenges"],
    });
    if (!errors || errors.length === 0) {
      router.back();
    } else {
      haptic.error();
    }
  });

  return {
    methods,
    control: methods.control,
    onSubmit,
    members,
    groupsQuery,
  };
};

export type ChallengeGroupMemberList =
  ChallengeGroupsQuery["challengeGroups"][number]["members"];
