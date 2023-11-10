import { CreateAccount } from "@/components/view/CreateAccountView";

export default function CardsPage() {
  return (
    <>
      <div className="content-center rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
            <CreateAccount />
      </div>
    </>
  )
}