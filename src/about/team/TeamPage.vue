<script lang="ts">
const shuffleMembers = (
  members: Member[],
  pinTheFirstMember = false
): void => {
  let offset = pinTheFirstMember ? 1 : 0
  // `i` is between `1` and `length - offset`
  // `j` is between `0` and `length - offset - 1`
  // `offset + i - 1` is between `offset` and `length - 1`
  // `offset + j` is between `offset` and `length - 1`
  let i = members.length - offset
  while (i > 0) {
    const j = Math.floor(Math.random() * i)
    ;[members[offset + i - 1], members[offset + j]] = [
      members[offset + j],
      members[offset + i - 1]
    ]
    i--
  }
}
</script>

<script setup lang="ts">
import { VTLink } from '@vue/theme'
import membersCoreData from './members-core.json'
import membersEmeritiData from './members-emeriti.json'
import membersPartnerData from './members-partner.json'
import membersData from './members.json'
import TeamHero from './TeamHero.vue'
import TeamList from './TeamList.vue'
import type { Member } from './Member'
shuffleMembers(membersCoreData as Member[], true)
shuffleMembers(membersData as Member[], true)
shuffleMembers(membersEmeritiData as Member[])
shuffleMembers(membersPartnerData as Member[])
</script>

<template>
  <div class="TeamPage">
    <TeamHero>
      <template #title>Meet the Team</template>
      <template #lead>
        Canxium began as a side project and was fair-launched, with no fundraising, no pre-mining, no private sales, and no public sales. It is still in its early stages and is maintained and developed by Neo. Additional members will be recruited over time to meet Canxium’s development needs.
      </template>
    </TeamHero>

    <TeamList :members="(membersCoreData as Member[])">
      <template #title>Core Team Members</template>
      <template #lead>
        Core team members are those who are actively involved in the
        maintenance of one or more core projects.
        
        Members are free to choose whether to keep their identity public or remain anonymous.
      </template>
    </TeamList>

    <TeamList :members="(membersData as Member[])">
      <template #title>Team Members</template>
      <template #lead>
        Team members are members hired by Neo to build, develop and
        maintenance of one or more core projects.
        
        Members are free to choose whether to keep their identity public or remain anonymous.
      </template>
    </TeamList>

    <TeamList :members="(membersPartnerData as Member[])">
      <template #title>Community Partners</template>
      <template #lead>
        Some members of the Canxium community have so enriched it, that they
        deserve special mention. We've developed a more intimate
        relationship with these key partners, often coordinating with them
        on upcoming features and news.
      </template>
    </TeamList>

    <TeamList :members="(membersEmeritiData as Member[])">
      <template #title>Team Emeriti</template>
      <template #lead>
        Here we honor some no-longer-active team members who have made
        valuable contributions in the past.
      </template>
    </TeamList>
  </div>
</template>

<style scoped>
.TeamPage {
  padding-bottom: 16px;
}

@media (min-width: 768px) {
  .TeamPage {
    padding-bottom: 96px;
  }
}

.TeamList + .TeamList {
  padding-top: 64px;
}
</style>
